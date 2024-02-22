package com.pwojcieszak.redditCloneBackend.service;

import com.pwojcieszak.redditCloneBackend.dto.CommentsDto;
import com.pwojcieszak.redditCloneBackend.exceptions.PostNotFoundException;
import com.pwojcieszak.redditCloneBackend.mapper.CommentMapper;
import com.pwojcieszak.redditCloneBackend.model.Comment;
import com.pwojcieszak.redditCloneBackend.model.NotificationEmail;
import com.pwojcieszak.redditCloneBackend.model.Post;
import com.pwojcieszak.redditCloneBackend.model.User;
import com.pwojcieszak.redditCloneBackend.repository.CommentRepository;
import com.pwojcieszak.redditCloneBackend.repository.PostRepository;
import com.pwojcieszak.redditCloneBackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentService {
    private static final String POST_URL = "";
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;

    public void save(CommentsDto commentsDto) {
        Post post = postRepository.findById(commentsDto.getPostId())
                .orElseThrow(() -> new PostNotFoundException(commentsDto.getPostId().toString()));
        Comment comment = commentMapper.map(commentsDto, post, authService.getCurrentUser());
        commentRepository.save(comment);

        String message = mailContentBuilder.build(comment.getUser().getUsername() + " posted a comment on your post." + POST_URL);
        sendCommentNotification(message, post.getUser());
    }

    private void sendCommentNotification(String message, User user) {
        mailService.sendMail(new NotificationEmail(user.getUsername() + " Commented on your post", user.getEmail(), message));
    }

    public List<CommentsDto> getAllCommentsForPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId.toString()));
        return commentRepository.findByPostOrderByCreatedDateDesc(post)
                .stream()
                .map(commentMapper::mapToDto).toList();
    }

    public List<CommentsDto> getAllCommentsForUser(String userName) {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException(userName));
        return commentRepository.findAllByUserOrderByCreatedDateDesc(user)
                .stream()
                .map(commentMapper::mapToDto)
                .toList();
    }
}
