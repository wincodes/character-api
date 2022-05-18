import * as Validator from "validatorjs";
import { Character } from "../entity/Character";
import { getRepository, getManager } from "typeorm";
import { log } from "../logger";
import { Location } from "../entity/Location";
import { Episode } from "../entity/Episode";

type Responses = {
  status: String;
  message: String;
  data: Object;
};

export class DataController {
  static async createCharacter(req: any, res: any): Promise<Responses> {
    try {
      const rules = {
        first_name: "required|string",
        last_name: "required|string",
        status: "required|in:ACTIVE,DEAD,UNKNOWN",
        state_of_origin: "string",
        gender: "required|in:MALE,FEMALE",
        location: "numeric",
        episode: "numeric",
      };

      const validation = new Validator(req.body, rules);

      if (validation.fails()) {
        return res.status(400).json({
          status: "failed",
          message: "Validation Errors",
          data: { errors: validation.errors.all() },
        });
      }

      const {
        first_name,
        last_name,
        status,
        state_of_origin,
        gender,
        episode,
        location,
      } = req.body;

      let locationData = null;
      let episodeData = null;

      //get episode and location
      if (location) {
        locationData = await getRepository(Location).findByIds(location);
        console.log(locationData);
        if (!locationData.length) {
          return res.status(422).json({
            status: "failed",
            message: `Unable to Locate Location Record`,
          });
        }
      }
      if (episode) {
        episodeData = await getRepository(Episode).findByIds(episode);
        console.log(episodeData);
        if (!episodeData.length) {
          return res.status(422).json({
            status: "failed",
            message: `Unable to Locate episode Record`,
          });
        }
      }

      const existingCharacter = await getRepository(Character).findOne({
        first_name,
        last_name,
      });
      if (existingCharacter) {
        return res.status(422).json({
          status: "failed",
          message: `Character already exists`,
        });
      }

      const character = new Character();
      character.first_name = first_name;
      character.last_name = last_name;
      character.status = status;
      character.state_of_origin = state_of_origin;
      character.gender = gender;
      if (locationData) character.location = locationData[0];
      if (episodeData) character.episodes = episodeData[0];
      await getManager().save(character);

      return res.status(201).json({
        status: "success",
        message: "character Successfully Created",
        data: character,
      });
    } catch (error) {
      await log("Create Character error", error, "default");
      return res.status(500).json({
        status: "failed",
        message: "An error Occurred Please Try again",
      });
    }
  }
}
