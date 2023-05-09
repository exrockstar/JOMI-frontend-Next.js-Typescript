import { GridFSBucket, MongoClient } from 'mongodb'

const mongo = new MongoClient(process.env.DATABASE_URL)

let client
let GridFS: GridFSBucket

export async function ConnectedClient(): Promise<MongoClient> {
  try {
    if (!client) {
      client = await mongo.connect()

      console.log('db connected')
      return client
    } else {
      return client
    }
  } catch (e) {
    throw new Error('Could not connect to db')
  }
}

export async function GetGridFS() {
  try {
    if (!GridFS) {
      const client = await ConnectedClient()
      GridFS = new GridFSBucket(client.db(process.env.DB_NAME), {
        writeConcern: { w: 'majority' }
      })
      console.log('GridFS Initialized.')
    }
    return GridFS
  } catch (e) {
    console.log('Could not initialize GridFS')
    throw e
  }
}

export default mongo
