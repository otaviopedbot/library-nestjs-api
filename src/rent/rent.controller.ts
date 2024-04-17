import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { CreateRentDTO } from "./dto/create-rent.dto";
import { RentService } from "./rent.service";
import { UpdatePatchRentDTO } from "./dto/update-patch-rent.dto";

@Controller('rents')
export class RentController {
    constructor(private readonly rentService: RentService) { }

    @Post()
    async create(@Body() data: CreateRentDTO) {
        return this.rentService.create(data);
    }

    @Get()
    async list() {
        return this.rentService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.rentService.show(id);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchRentDTO, @Param('id', ParseIntPipe) id: number) {
        return this.rentService.updatePartial(id, data);
    }

    @Patch('/finish/:id')
    async finish(@Param('id', ParseIntPipe) id: number) {
        return await this.rentService.finish(id)
    }

}