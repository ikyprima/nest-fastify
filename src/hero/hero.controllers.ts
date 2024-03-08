import { Controller,Get, Res } from '@nestjs/common';

@Controller("hero")
export class HeroController{
    @Get()
    index(@Res()reply){
        reply
        .status(200)
        .send({
            title : "tes"
        })

    }
}