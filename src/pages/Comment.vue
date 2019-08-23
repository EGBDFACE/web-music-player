<template>
    <div class="subpage_viewport" id='comment'>
        <div class="hot_comment" v-if="comments.offset == 0 && comments.hotComments">
            <div class="hot_comment__title">热门评论</div>
            <CommentItem :list="comments.hotComments" />
        </div>
        <div class="new_comment" v-if="comments.comments">
            <div class="new_comment__title">
                <span>最新评论</span>
                <span>（{{comments.totalCount}}）</span>
            </div>
            <CommentItem :list="comments.comments" />
        </div>
        <div class="comment_footer" v-if="comments.totalCount" >
            <span class="footer__page__start" 
                @click="MBackToBeginning()"
                v-if="comments.totalCount>20 && CCurrentPage > 1"
                >&lt;&lt;</span>
            <span class="footer__page__previous" 
                @click="MPreviousPage()"
                v-if="comments.totalCount > 20 && CCurrentPage > 1"
                >&lt;</span>
            <span class="footer__page__current">{{CCurrentPage}}</span>
            <span>/</span>
            <span class="footer__page__total">{{CEndPage}}</span>
            <span class="footer__page__next" 
                @click="MNextPage()"
                v-if="CCurrentPage < CEndPage"
                >&gt;</span>
            <span class="footer__page__end" 
                @click="MGoToEnd()"
                v-if="CCurrentPage < CEndPage"
                >&gt;&gt;</span>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { fetchComment } from '@/api';
import CommentItem from '@/components/CommentItem';
import { createCommentsWithoutHot } from '@/utils/comment';

export default {
    name: 'Comment',
    components: {
        CommentItem
    },
    // data: function() {
    //     return {
    //         beforePrevious: 0
    //     }
    // },
    computed: {
        ...mapState({
            comments: state => state.comment.comments
        }),
        CCurrentPage() {
            return this.comments.offset+1;
        },
        CEndPage() {
            const pagesNum = Math.ceil(this.comments.totalCount/20);
            return pagesNum>5001 ? 5001 : pagesNum ;
        }
    },
    methods: {
        ...mapActions([
            'setComments'
        ]),
        MBackToBeginning() {
            fetchComment(this.comments.musicId)
            .then( res => {
                this.setComments(createCommentsWithoutHot(res.data,this.comments.musicId, 0));
            })
            .catch( err => {
                console.error(err.message);
            });
            document.getElementById('comment').scrollTop =0;
        },
        MPreviousPage() {
            // if (this.comments.offset-1 > 5000) {

            // }
            fetchComment(this.comments.musicId,this.comments.offset-1)
            .then( res => {
                this.setComments(createCommentsWithoutHot(res.data,this.comments.musicId,this.comments.offset-1));
            })
            .catch( err => {
                console.error(err.message);
            });
            document.getElementById('comment').scrollTop =0;
        },
        MNextPage() {
            // if (this.comments.offset+1 > 5000) {
            //     this.beforePrevious = this.comments.comments[this.comments.comments.length-1].time;
            //     fetchComment(this.comments.musicId,this.comments.offset+1,this.beforePrevious)
            //     .then( res => {
            //         this.setComments(createCommentsWithoutHot(res.data,this.comments.musicId,this.comments.offset+1));
            //     })
            //     .catch( err => {
            //         console.error(err.message);
            //     })
            // } else {
                fetchComment(this.comments.musicId,this.comments.offset+1)
                .then( res => {
                    this.setComments(createCommentsWithoutHot(res.data,this.comments.musicId,this.comments.offset+1));
                })
                .catch( err => {
                    console.error(err.message);
                });
            // }
            document.getElementById('comment').scrollTop =0;
        },
        MGoToEnd() {
            if (this.comments.totalCount/20>5000){
                fetchComment(this.comments.musicId,5000,0)
                .then (res => {
                    this.setComments(createCommentsWithoutHot(res.data,this.comments.musicId,5000))
                })
                .catch( err => {
                    console.error(err.message);
                })
            } else {
                fetchComment(this.comments.musicId,Math.floor(this.comments.totalCount/20))
                .then( res => {
                    this.setComments(createCommentsWithoutHot(res.data,this.comments.musicId,Math.floor(this.comments.totalCount/20)));
                })
                .catch ( err => {
                    console.error(err.message);
                });
            }
            document.getElementById('comment').scrollTop =0;
        }
    }
}
</script>

<style lang="scss" scoped>
.subpage_viewport {
    height: 90%;
    overflow-x: hidden;
    overflow-y: auto;
}
.hot_comment {
    margin-bottom: 20px;
}
.hot_comment__title {
    margin-bottom: 10px;
}
.new_comment {
    @extend .hot_comment;
}
.hot_comment__title {
    @extend .hot_comment__title;
}
.comment_footer {
    text-align: center;
}
.footer__page__start, .footer__page__previous {
    cursor: pointer;
    margin-right: 5px;
    &:hover {
        color: white;
    }
}
.footer__page__end, .footer__page__next {
    @extend .footer__page__start;
    margin-left: 5px;
    margin-right: 0;
}
</style>