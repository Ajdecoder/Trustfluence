from youtube_comment_downloader import YoutubeCommentDownloader



def fetch_youtube_comments(video_id):
    downloader = YoutubeCommentDownloader()
    comments = downloader.get_comments(video_id)

    comments_list = []
    for comment in comments:
        comments_list.append(comment["text"])

        if len(comments_list) >= 20:
            break

    return comments_list
