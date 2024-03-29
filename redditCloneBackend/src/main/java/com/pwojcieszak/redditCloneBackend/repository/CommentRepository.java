package com.pwojcieszak.redditCloneBackend.repository;

import com.pwojcieszak.redditCloneBackend.model.Comment;
import com.pwojcieszak.redditCloneBackend.model.Post;
import com.pwojcieszak.redditCloneBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostOrderByCreatedDateDesc(Post post);
    List<Comment> findAllByUserOrderByCreatedDateDesc(User user);
}
