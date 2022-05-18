import * as Validator from "validatorjs";
import { Character } from "../entity/Character";
import { getRepository, getManager } from "typeorm";
import { log } from "../logger";

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

      //get episode and location

      const character = new Character();
      character.first_name = first_name;
      character.last_name = last_name;
      character.status = status;
      character.state_of_origin = state_of_origin;
      character.gender = gender;
      await getManager().save(character);


      return res.status(201).json({
        status: "success",
        message: "character Successfully Created",
        data: {
          id: character.id,
          first_name,
          last_name,
          status,
          state_of_origin,
          gender,
        },
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
