import { Module } from '@nestjs/common';
import { ExampleModule } from 'example/example.module';

@Module({
  imports: [ExampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
