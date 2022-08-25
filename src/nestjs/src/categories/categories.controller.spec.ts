import { OutputCreateCategory } from 'mvt-core/category/application';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesController Unit Tests', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const input: CreateCategoryDto = {
        name: 'TESTE',
        description: 'SOME DESCRIPTION',
        is_active: true,
      };

      const output: OutputCreateCategory = {
        id: '123',
        name: 'TESTE',
        description: 'SOME DESCRIPTION',
        is_active: true,
        created_at: new Date(),
      };

      const mockCreateUseCase = {
        execute: jest.fn().mockReturnValue(Promise.resolve(output)),
      };

      controller['createUseCase'] = mockCreateUseCase as any;
      expect(controller.create(input)).toBeInstanceOf(Promise);
      const category = await controller.create(input);

      expect(mockCreateUseCase.execute).toBeCalledWith(input);
      expect(category).toStrictEqual(output);
    });
  });

  describe('search', () => {
    it('should get a list of categories', async () => {
      const searchParams: SearchCategoryDto = {
        page: 1,
        per_page: 15,
        sort: 'name',
        sort_dir: 'asc',
        filter: 'test',
      };

      const output = {
        items: [
          {
            id: 'ba543495-53a7-438d-ba69-c446a3404f85',
            name: 'Filmes',
            description: null,
            is_active: true,
            created_at: '2022-08-24T16:45:45.607Z',
          },
        ],
        total: 1,
        current_page: 1,
        last_page: 1,
        per_page: 15,
      };

      const mockListCategoryUseCase = {
        execute: jest.fn().mockReturnValue(Promise.resolve(output)),
      };

      controller['listCategoriesUseCase'] = mockListCategoryUseCase as any;
      expect(controller.search(searchParams)).toBeInstanceOf(Promise);
      const category = await controller.search(searchParams);

      expect(mockListCategoryUseCase.execute).toBeCalledWith(searchParams);
      expect(category).toStrictEqual(output);
    });
  });

  describe('get by id', () => {
    it('should get a category by id', async () => {
      const input = '123-abc';

      const output = {
        id: 'ba543495-53a7-438d-ba69-c446a3404f85',
        name: 'Filmes',
        description: null,
        is_active: true,
        created_at: '2022-08-24T16:45:45.607Z',
      };

      const mockGetCategoryUseCase = {
        execute: jest.fn().mockReturnValue(Promise.resolve(output)),
      };

      controller['getCategoryUseCase'] = mockGetCategoryUseCase as any;
      expect(controller.findOne(input)).toBeInstanceOf(Promise);
      const category = await controller.findOne(input);

      expect(mockGetCategoryUseCase.execute).toBeCalledWith({ id: input });
      expect(category).toStrictEqual(output);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const id = '123-abc';
      const input: UpdateCategoryDto = { name: 'juvenal' };
      const output = {
        id,
        name: 'juvenal',
        description: null,
        is_active: true,
        created_at: '2022-08-24T16:45:45.607Z',
      };

      const mockUpdateCategoryUseCase = {
        execute: jest.fn().mockReturnValue(Promise.resolve(output)),
      };

      controller['updateCategoryUseCase'] = mockUpdateCategoryUseCase as any;
      expect(controller.update(id, input)).toBeInstanceOf(Promise);
      const category = await controller.update(id, input);

      expect(mockUpdateCategoryUseCase.execute).toBeCalledWith({
        id,
        ...input,
      });
      expect(category).toStrictEqual(output);
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      const id = '123-abc';
      const mockDeleteCategoryUseCase = {
        execute: jest.fn().mockReturnValue(Promise.resolve(undefined)),
      };

      controller['deleteCategoryUseCase'] = mockDeleteCategoryUseCase as any;
      expect(controller.remove(id)).toBeInstanceOf(Promise);
      const category = await controller.remove(id);

      expect(mockDeleteCategoryUseCase.execute).toBeCalledWith({ id });
      expect(category).toStrictEqual(undefined);
    });
  });
});
