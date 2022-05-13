import { ImageSetsMemoryPersistence } from '../../src/persistence/ImageSetsMemoryPersistence';
import { ImageSetsPersistenceFixture } from './ImageSetsPersistenceFixture';

suite('ImageSetsMemoryPersistence', ()=> {
    let persistence: ImageSetsMemoryPersistence;
    let fixture: ImageSetsPersistenceFixture;
    
    setup(async () => {
        persistence = new ImageSetsMemoryPersistence();
        fixture = new ImageSetsPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});