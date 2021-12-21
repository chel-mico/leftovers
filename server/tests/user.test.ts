import { TestHelper } from './testHelper';

beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
});

beforeEach(async () => {
    await TestHelper.instance.clear();
});

afterAll(() => {
    TestHelper.instance.teardownTestDB();    
});

describe('User Tests', () => {
    it('should create a new user', async () => {
        //TODO
    });
});