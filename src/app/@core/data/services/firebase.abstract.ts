import { AngularFirestore, } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

export abstract class FirebaseService {

    constructor(
        public afAuth: AngularFireAuth,
        public db: AngularFirestore) {
 
    }

    allFromFirebase(path): Observable<any[]> {
        return this.db.collection(path).valueChanges();
    }

    paginate(path, perPage, starts, filters, sort) {
        const collection = this.db.collection(path, ref => {
            return ref.limit(perPage)
                .where(filters.field, filters.operator, filters.search)
                .orderBy(sort, 'desc');
        });
        return collection.valueChanges();
    }

}
