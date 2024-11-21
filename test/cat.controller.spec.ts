import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from '../src/cats/cats.controller';
import { CatsService } from '../src/cats/cats.service';
import { OrderDto } from '../src/cats/cats.interface';
describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            getOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    catsController = module.get<CatsController>(CatsController);
    catsService = module.get<CatsService>(CatsService);
  });

  describe('getOrder', () => {
    it('should return an order', async () => {
      const result = { id: 1, status: 2 };
      jest.spyOn(catsService, 'getOrder').mockResolvedValue(result);

      const orderDto = new OrderDto({
        id: result.id,
        status: result.status,
      });

      expect(await catsController.getOrder(1234)).toEqual(orderDto);
    });
  });
});
