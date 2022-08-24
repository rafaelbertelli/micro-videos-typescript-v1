import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    service = new CategoriesService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
