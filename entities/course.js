class Course {
  
  constructor( model ) {
    this.model = model;
  }

  save ( db ) {
    new Promise ( (resolve, reject) => {
      db.collection( this.getCollectionName() ).insertOne( 
        this.model, 
        (err, result) => {
          this.model._id = result._id;
          resolve(result);
        }
      );
    })
  }

  update ( db ) {
    new Promise ( (resolve, reject) => {
      db.collection( this.getCollectionName() ).update( 
        this.model, 
        (err, result) => {
          resolve(result);
        }
      );
    })
  }

  read ( db ) {

  }

  delete ( db ) {

  }


  static getModel() {
    return {
      name            : '',
      description     : '',
      active          : '',
      grade           : '',
      createdDate     : '',
      updatedDate     : '',
      views           : '',
      deactivateReson : ''
    }
  }

  static getCollectionName() {
    return 'course';
  }


}

module.exports = Course;