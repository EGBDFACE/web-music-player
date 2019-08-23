class CommentUser{
    constructor({avatarUrl,nickname,userId}){
        this.avatarUrl = avatarUrl;
        this.nickname = nickname;
        this.userId = userId;
    }
}
class CommentItem{
    constructor({commentId,content,isRepliedFor,
        likedByUser,likedCount,parentComment,time,user}){
        this.commentId = commentId;
        this.content = content;
        this.isRepliedFor = isRepliedFor;
        this.likedByUser = likedByUser;
        this.likedCount = likedCount;
        this.commentUser = new CommentUser({
            avatarUrl: user.avatarUrl,
            nickname: user.nickname,
            userId: user.userId
        });
        this.commentTime = new Date(time);
        if (isRepliedFor) {
            this.parentCommentId = parentComment.id;
            this.parentCommentContent = parentComment.content;
            this.parentCommentUser = new CommentUser({
                avatarUrl: parentComment.user.avatarUrl,
                nickname: parentComment.user.nickname,
                userId: parentComment.user.userId
            })
        }
    }
}

function formatCommentItem (comment) {
    let parentComment = null;
    let isRepliedFor = false;
    if (comment.beReplied.length > 0) {
        isRepliedFor = true;
        parentComment = {
            id: comment.parentCommentId,
            content: comment.beReplied[0].content,
            user: comment.beReplied[0].user
        }
    };
    const commentItem = new CommentItem ({
        commentId: comment.commentId,
        content: comment.content,
        isRepliedFor: isRepliedFor,
        likedByUser: comment.liked,
        likedCount: comment.likedCount,
        parentComment: parentComment,
        time: comment.time,
        user: comment.user
    });
    return commentItem;
}

export function createComments (rawData,musicId) {
    const comments = {
        comments: new Array(),
        hasMore: rawData.more,
        hasMoreHot: rawData.moreHot,
        hotComments: new Array(),
        musicId,
        offset: 0,
        totalCount: rawData.total,
    }
    for (let i=0; i<rawData.comments.length; i++) {
        comments.comments[i] = formatCommentItem(rawData.comments[i]);
    }
    for (let i=0; i<rawData.hotComments.length; i++) {
        comments.hotComments[i] = formatCommentItem(rawData.hotComments[i]);
    }
    return comments;
}
export function createCommentsWithoutHot( rawData, musicId, offset) {
    const comments = {
        comments: new Array(),
        hasMore: rawData.more,
        musicId,
        offset,
        totalCount: rawData.total,
    }
    for (let i=0; i<rawData.comments.length; i++) {
        comments.comments[i] = formatCommentItem(rawData.comments[i]);
    }
    return comments;
}