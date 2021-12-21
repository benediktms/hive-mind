import { EntityFactory } from './entity.factory';

describe('EntityFactory ', () => {
  const entityFactory = new EntityFactory();

  it('should correctly create a user entity', async () => {
    const user = await entityFactory.generateUser({
      email: 'johndoe@example.com',
    });

    entityFactory.prisma.user.create.mockResolvedValue(user);
    expect(user).toEqual(
      expect.objectContaining({ email: 'johndoe@example.com' })
    );
  });
});
