import { EntityStoreModule } from './entity-store.module';

describe('EntityStoreModule', () => {
  let entityStoreModule: EntityStoreModule;

  beforeEach(() => {
    entityStoreModule = new EntityStoreModule();
  });

  it('should create an instance', () => {
    expect(entityStoreModule).toBeTruthy();
  });
});
