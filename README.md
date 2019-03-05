# INSTRUCTIONS TO RUN

1. `npm install` (sorry for the delay here, first install is insane now with React/Babel these days)
2. make sure have sqlite3 installed (if macOS, https://brewformulas.org/sqlite)
3. `npm run db:migrate`
4. `npm run db:seed` 
5. (OPTIONAL) TODO generate your own RSA256 private/public key and add to `config/`
6. `npm run build:prod` to do webpack things
7. `npm run start:dev`
8. open browser, go to localhost:9300
9. email "user1@doc-pat.co" and password "demo1234"
10. logout and test email "user2@doc-pat.co" and same password "demo1234"

# other things

- sorry for the delay on this, I have about 6 "take-homes" in my queue right now interviewing all day Monday-Friday (trying to do them in received order)
- things I added outside the scope of the project for better or for worse
  - process management hooks
  - RSA encryption for JWT so that you can trust data inside and comes with free expiration
  - bcrypt hashing for password storage
  - some better than normal logging (expermenting with this for personal use as well)
- I used sqlite3 for persistant storage because I wanted to use this to see what's changed from when I've used it on Android
- my react is pretty sloppy but I dove deep into all that's changed with React 16 and made sure to figure out where the static method `getDerivedStateFromProps` comes into play
- decided to go with a vanilla sql query in the controller at one point with the join because I was fed up with sequelize at some point doing self joins to make the Doctor/Patient connection
  - at least this way, you can super easily have a doctor having a doctor and anyone having more than one doctor
- areas to improve
  - cleanup logs
  - cleanup swagger responses/errors
  - auth checks on updates
  - React redux (maybe? meh, I always try and stay as light as possible)
  - loading user feedback (animations)
  - wire in sequelize relation so no raw queries
  - frontend urls are fakes and you can't go back to them if you hit the page directly
    - need to add hard refresh mapping at backend level but ideally all this would be static anyway

---

Sincerely hope not too late on this! Let me know what you think.

Best,
Christian