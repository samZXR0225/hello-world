import { environment } from 'src/environments/environment';

export class FirebaseInfo {

  TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxZDE5OWRkZDBlZTVlNzMzZGI0YTliN2FiNDAxZGRhMzgxNTliNjIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLXNhbXBsZS1hYzg0ZCIsImF1ZCI6ImZpci1zYW1wbGUtYWM4NGQiLCJhdXRoX3RpbWUiOjE1NTc3NTIwNjEsInVzZXJfaWQiOiI0bnIwUE9XSkJjVjh4eWMzTVd1R29GdDVkM0MzIiwic3ViIjoiNG5yMFBPV0pCY1Y4eHljM01XdUdvRnQ1ZDNDMyIsImlhdCI6MTU1Nzc1MjA2MSwiZXhwIjoxNTU3NzU1NjYxLCJlbWFpbCI6InRzYWlkYTAyMjVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRzYWlkYTAyMjVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.c3Mo1mNaxspnj5GPvT4nIXBqOofchtuCI8JNPdd-l-z_dGzyWc1bTBeexpnY1LzDnK_NwqNffjwV85d7fd4o96oXNsz-bIP_5UEUDkUo7Q1702ju8H45rr4BNGjTNLAnVR0gDCeD6dqGh-MTjb1pP7SbZp9PaGY-sfb-E0GhZfh64m543u-OS_xThPg6Nskr4gLLt-8EG-Z2TuUs3jww3YgJktClkVL-H5XOvrE6FEyvQTNIjywxKRjYnyfsXzAwQH0SVlAQ_XLLQimGxNhF5toGOa25QMN2eeHtjaTdjx5g_Iy0QdCxrgsYhuc9VEQa6ZJcDHQNGIYI8fgFESPf8A';

  public url: string;
  public user: any = {};
  public key: any = {};
  public token: string;

  constructor() {
    this.url = environment.firebase.url;
    this.key = environment.firebase.key;
    this.user = environment.firebase.user;
    // this.user = {
    //   name: '',
    //   email: environment.firebase.user.email,
    //   password: environment.firebase.user.password,
    // };
    // this.token = '';
    this.token = this.TOKEN;
  }
}
