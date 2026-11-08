import { useRef, useState } from 'react';
import './App.css';

const postDateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function App() {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const nextPostId = useRef(1);

  function handleSubmit(event) {
    event.preventDefault();
    const text = content.trim();

    if (!text) {
      setError('Write something before posting.');
      return;
    }

    setPosts((currentPosts) => [
      {
        id: nextPostId.current++,
        content: text,
        createdAt: new Date().toISOString(),
        likes: 0,
        likedByMe: false,
      },
      ...currentPosts,
    ]);
    setContent('');
    setError('');
  }

  function handleLike(postId) {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) return post;

        const likedByMe = !post.likedByMe;
        return {
          ...post,
          likedByMe,
          likes: post.likes + (likedByMe ? 1 : -1),
        };
      }),
    );
  }

  function handleDelete(postId) {
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true">
            p
          </span>
          <span>pulse</span>
        </div>
        <span className="topbar-label">A little space for your thoughts</span>
        <div className="profile-chip">
          <span className="profile-avatar" aria-hidden="true">
            Y
          </span>
          <span>You</span>
        </div>
      </header>

      <main className="page-layout">
        <aside className="sidebar">
          <div className="sidebar-intro">
            <span className="sidebar-orb" aria-hidden="true">
              ✦
            </span>
            <h1>Your daily feed</h1>
            <p>Share a thought. Find your people.</p>
          </div>
          <div className="sidebar-note">
            <span className="note-dot" aria-hidden="true" />
            <p>
              Your posts are saved for this session. Like a post to show some love.
            </p>
          </div>
        </aside>

        <section className="feed" aria-label="Blog feed">
          <section className="composer card" aria-labelledby="composer-heading">
            <div className="composer-top">
              <span className="profile-avatar composer-avatar" aria-hidden="true">
                Y
              </span>
              <div>
                <h2 id="composer-heading">What&apos;s on your mind?</h2>
                <p>Share it with the community</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <label className="visually-hidden" htmlFor="post-content">
                Write a post
              </label>
              <textarea
                id="post-content"
                value={content}
                onChange={(event) => {
                  setContent(event.target.value);
                  setError('');
                }}
                placeholder="Write something worth sharing..."
                maxLength={280}
                rows={4}
              />
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <div className="composer-actions">
                <span className="character-count" aria-live="polite">
                  {content.length}/280
                </span>
                <button className="post-button" type="submit">
                  Post
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </form>
          </section>

          <div className="feed-heading">
            <div>
              <p className="eyebrow">THE COMMUNITY</p>
              <h2>Latest posts</h2>
            </div>
            <span className="post-count">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="empty-feed card" aria-live="polite">
              <span className="empty-symbol" aria-hidden="true">
                ✎
              </span>
              <h3>The feed is quiet</h3>
              <p>Be the first to share a thought with the community.</p>
            </div>
          ) : (
            <ul className="post-list" aria-live="polite">
              {posts.map((post) => (
                <li className="post-card card" key={post.id}>
                  <div className="post-top">
                    <span className="profile-avatar" aria-hidden="true">
                      Y
                    </span>
                    <div className="post-author">
                      <h3>You</h3>
                      <time dateTime={post.createdAt}>
                        {postDateFormatter.format(new Date(post.createdAt))}
                      </time>
                    </div>
                    <span className="your-post">YOUR POST</span>
                  </div>
                  <p className="post-content">{post.content}</p>
                  <div className="post-actions">
                    <button
                      className={`like-button${post.likedByMe ? ' is-liked' : ''}`}
                      type="button"
                      onClick={() => handleLike(post.id)}
                      aria-label={`${post.likedByMe ? 'Unlike' : 'Like'} post, ${post.likes} ${
                        post.likes === 1 ? 'like' : 'likes'
                      }`}
                      aria-pressed={post.likedByMe}
                    >
                      <span aria-hidden="true">{post.likedByMe ? '♥' : '♡'}</span>
                      <span>{post.likes > 0 ? post.likes : 'Like'}</span>
                    </button>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      aria-label="Delete your post"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
