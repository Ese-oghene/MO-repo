import { bootstrapApplication} from '@angular/platform-browser';
import { withEnabledBlockingInitialNavigation } from '@angular/router'; // ✅ correct
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient()
  ]
});
