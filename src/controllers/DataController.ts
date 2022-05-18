import * as Validator from "validatorjs";
import { Character } from "../entity/Character";
import { getRepository, getManager } from "typeorm";
import { log } from "../logger";
import { Location } from "../entity/Location";
import { Episode } from "../entity/Episode";
import { Comment } from "../entity/Comments";

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
        episode: "array",
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
        locationData = await getRepository(Location).findByIds([location]);
        // console.log(locationData);
        if (!locationData.length) {
          return res.status(422).json({
            status: "failed",
            message: `Unable to Locate Location Record`,
          });
        }
      }
      if (episode.length) {
        episodeData = await getRepository(Episode).findByIds(episode);
        // console.log(episodeData);
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
      if (episodeData) character.episodes = episodeData;
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

  static async createEpisode(req: any, res: any): Promise<Responses> {
    try {
      const rules = {
        name: "required|string",
        release_date: "required|date",
        episode_code: "required|string",
        characters: "array",
        comments: "array",
      };

      const validation = new Validator(req.body, rules);

      if (validation.fails()) {
        return res.status(400).json({
          status: "failed",
          message: "Validation Errors",
          data: { errors: validation.errors.all() },
        });
      }

      const { name, release_date, episode_code, characters, comments } =
        req.body;

      let characterList = null;
      let commentList = null;

      //get episode and location
      if (characters && characters.length) {
        characterList = await getRepository(Character).findByIds(characters);
        // console.log(characterList);
        if (!characterList.length) {
          return res.status(422).json({
            status: "failed",
            message: `Unable to Locate Characters Record`,
          });
        }
      }
      if (comments && comments.length) {
        commentList = await getRepository(Comment).findByIds(comments);
        // console.log(commentList);
        if (!commentList.length) {
          return res.status(422).json({
            status: "failed",
            message: `Unable to Locate episode Record`,
          });
        }
      }

      const existingEp = await getRepository(Episode).findOne({
        name,
        episode_code,
      });

      if (existingEp) {
        return res.status(422).json({
          status: "failed",
          message: `Episode already exists`,
        });
      }

      const episode = new Episode();
      episode.name = name;
      episode.release_date = release_date;
      episode.episode_code = episode_code;
      if (characterList) episode.characters = characterList;
      if (commentList) episode.episode_comments = commentList;
      await getManager().save(episode);

      return res.status(201).json({
        status: "success",
        message: "Episode Successfully Created",
        data: episode,
      });
    } catch (error) {
      await log("Create Episode error", error, "default");
      return res.status(500).json({
        status: "failed",
        message: "An error Occurred Please Try again",
      });
    }
  }

  static async createComment(req: any, res: any): Promise<Responses> {
    try {
      const rules = {
        comment: "required|string",
        ip_address_location: "required|string",
      };

      const validation = new Validator(req.body, rules);

      if (validation.fails()) {
        return res.status(400).json({
          status: "failed",
          message: "Validation Errors",
          data: { errors: validation.errors.all() },
        });
      }

      const { comment, ip_address_location } = req.body;

      const newComment = new Comment();
      newComment.comment = comment;
      newComment.ip_address_location = ip_address_location;
      await getManager().save(newComment);

      return res.status(201).json({
        status: "success",
        message: "Comment Successfully Created",
        data: newComment,
      });
    } catch (error) {
      await log("Create Comment error", error, "default");
      return res.status(500).json({
        status: "failed",
        message: "An error Occurred Please Try again",
      });
    }
  }

  static async createLocation(req: any, res: any): Promise<Responses> {
    try {
      const rules = {
        name: "required|string",
        latitude: "required|numeric",
        longitude: "required|numeric",
      };

      const validation = new Validator(req.body, rules);

      if (validation.fails()) {
        return res.status(400).json({
          status: "failed",
          message: "Validation Errors",
          data: { errors: validation.errors.all() },
        });
      }

      const { name, latitude, longitude } = req.body;

      const location = new Location();
      location.name = name;
      location.latitude = latitude;
      location.longitude = longitude;
      await getManager().save(location);

      return res.status(201).json({
        status: "success",
        message: "Location Successfully Created",
        data: location,
      });
    } catch (error) {
      await log("Create Location error", error, "default");
      return res.status(500).json({
        status: "failed",
        message: "An error Occurred Please Try again",
      });
    }
  }
}
