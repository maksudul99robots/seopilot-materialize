export function ValidateEmail(input:string) {

    var validRegex = /[a-zA-Z0-9_\-.+]+(?:@|\[at])(?!(?:sentry-|sentry\.|sentry_))[a-zA-Z0-9-]+\.(?!(?:jpg|png|gif|jpeg|svg|webp|bmp|tiff|ico|heif|avif)$)(?!.*\.(?:jpg|png|gif|jpeg|svg|webp|bmp|tiff|ico|heif|avif))[\w.]+/gi;
  
    if (input.match(validRegex)) {

  
      return true;
  
    } else {
  

      return false;
  
    }
  
}
  
  