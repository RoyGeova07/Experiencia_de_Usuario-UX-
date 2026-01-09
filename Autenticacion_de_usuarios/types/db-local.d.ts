declare module 'db-local' 
{

  export default class DBLocal 
  {

    constructor(options: { path: string })
    Schema: (name: string, schema: any) => any
    
  }

}
