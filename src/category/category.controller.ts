import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CategoryDto,
  FilterCategoryDto,
  TherapistCategoryDto,
  UpdateCategoryDto,
} from './category.dto';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createNewCategory(@Body() input: CategoryDto) {
    return this.categoryService.createCategory(input);
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() input: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, input);
  }

  @Get()
  getAllCategories(@Query() query: FilterCategoryDto) {
    return this.categoryService.getAllCategories(query);
  }

  @Put()
  addCategoriestoTherapist(@Body() input: TherapistCategoryDto[]) {
    return this.categoryService.addCategoryToTherapist(input);
  }
}
