import { Test, TestingModule } from '@nestjs/testing';
import { PaymentplansController } from './paymentplans.controller';
import { PaymentplansService } from './paymentplans.service';

describe('PaymentplansController', () => {
  let controller: PaymentplansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentplansController],
      providers: [PaymentplansService],
    }).compile();

    controller = module.get<PaymentplansController>(PaymentplansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
