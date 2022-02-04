import { PartialType } from '@nestjs/swagger';
import { CreateTherapistDto } from './create-therapist.dto';

export class UpdateTherapistDto extends PartialType(CreateTherapistDto) {}
