
export default class Messages{
    constructor(db){
        this.db = db;
    }

    add(user_id, author_name, content){
        message = {
            user_id : user_id,
            author_name : author_name,
            date : new Date(),
            content : content,
            likers : []
        }
        return new Promise((resolve, reject) =>{
            this.db.messages.insert(message, (err, doc) =>{
                if(err){
                    reject(err)
                } else {
                    resolve(true)
                }
            });
        })
        
    }

    get(user_id){
        return new Promise((resolve, reject) => {
            this.db.messages.find({user_id: user_id}, (err, docs) =>{
                if(err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            })
        })
    }
    
    async getFeed(user_id, friends){
        const friend_list = await friends.get(user_id);
        feed = []
        friend_list.forEach(async (friend) => {
            feed.push(await this.get(friend));
        })
        feed.sort(this._GetSortOrder("date"))
        return feed
    }

    _GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }    
    
    edit(message_id, content){
        return new Promise((resolve, reject) => {
            this.db.messages.update({_id: message_id}, {$set : {content : content}}, (err, doc) =>{
                if(err)
                    reject(err)
                else
                    resolve(true)
            });
        })
    }

    search(query){
        return new Promise((resolve, reject) => {
            this.db.messages.find({$text : {$search: query}}, (err, docs) =>{
                if(err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            })
        })
    }
    // Idéalement il faudrait utiliser ici un système de transactions
    async like(user_id, message_id){
        already_liked = await(this.has_liked(user_id, message_id));
        if(!already_liked){
            await this.db.messages.update({_id: message_id}, {$push : {likers: user_id}});
            return true;
        } else {
            await this.db.messages.update({_id: message_id}, {$pull : {likers: user_id}});
            return false;
        }
    }

    has_liked(user_id, message_id){
        return new Promise((resolve, reject) => {
            this.db.messages.findOne({_id: message_id, likers : user_id}, (err, doc) =>{
                if(err) {
                    reject(err);
                } else {
                    resolve(doc != undefined);
                }
            })
        })
    }

    async delete(id){
        await this.db.messages.deleteOne({_id : id}).then((res) => {
            return res.deletedCount
        }) 
    }
}

