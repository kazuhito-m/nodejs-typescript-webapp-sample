import { UserEntity } from '../../../../../src/infrastracture/datasource/user/user-entity';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new UserEntity()).toBeDefined();
  });
});
