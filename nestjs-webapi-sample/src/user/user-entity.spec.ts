import { UserEntity } from '../infrastracture/datasource/user/user-entity';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new UserEntity()).toBeDefined();
  });
});
