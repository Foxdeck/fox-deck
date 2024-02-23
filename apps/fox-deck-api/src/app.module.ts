import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {UserModule} from "./modules/user/user.module";
import {SecurityInterceptor} from "./shared/interceptors/security.interceptor";
import {NoteModule} from "./modules/note/note.module";

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SecurityInterceptor,
    },
  ],
  imports: [ConfigModule.forRoot(), UserModule, NoteModule],
})
export class AppModule {}
