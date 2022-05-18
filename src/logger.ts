import * as fs from "fs-extra"
import * as moment from 'moment'
import * as util from "util"

export const log = async (message: String, data: Object, folder: String): Promise<void> => {
  try {

    const date = moment().format('YYYY-MM-DD')
    const filePath = `./storage/logs/${folder}/${date}.log`;

    await fs.ensureFile(filePath)

    const logger = await fs.createWriteStream(filePath, {
      flags: 'a'
    })


    const timestamp = moment().format();
    await logger.write(`\n ${timestamp} ${message}`);

    await logger.write(`\n ${timestamp} ${util.inspect(data)}`);

    // logger.end()
  } catch (err) {
    console.log('Logger Failed', err)

    console.log('data to be logged', data)
  }

}