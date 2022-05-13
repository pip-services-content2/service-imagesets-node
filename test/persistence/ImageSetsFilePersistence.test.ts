import { ImageSetsFilePersistence } from '../../src/persistence/ImageSetsFilePersistence';
import { ImageSetsPersistenceFixture } from './ImageSetsPersistenceFixture';

suite('ImageSetsFilePersistence', ()=> {
    let persistence: ImageSetsFilePersistence;
    let fixture: ImageSetsPersistenceFixture;
    
    setup(async () => {
        persistence = new ImageSetsFilePersistence('./data/ImageSets.test.json');

        fixture = new ImageSetsPersistenceFixture(persistence);
        
        await persistence.open(null);
        await persistence.clear(null);
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