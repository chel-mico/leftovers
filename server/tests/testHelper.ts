
import { User } from '../src/entities/User';
import { Connection, createConnection, Repository } from 'typeorm';

export class TestHelper {

    private static _instance: TestHelper;

    private constructor() {}

    public static get instance(): TestHelper {
        if(!this._instance) this._instance = new TestHelper();

        return this._instance;
    }

    private dbConnect!: Connection;
    public dbUser!: Repository<User>;

    async setupTestDB() {
        this.dbConnect = await createConnection({
            type: 'postgres',
            database: 'tests',
            username: 'postgres',
            password: 'iatwima4!',
            entities: ["src/entities/**/*.ts"],
            synchronize: true
        });
    }

    async clear() {
        await this.dbConnect.dropDatabase();
    }

    teardownTestDB() {
        this.dbConnect.close();
    }

}