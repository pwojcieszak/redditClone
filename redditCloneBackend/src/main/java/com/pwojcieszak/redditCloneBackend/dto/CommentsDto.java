package com.pwojcieszak.redditCloneBackend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentsDto {
    private Long id;
    private Long postId;
    private String duration;
    @NotBlank
    private String text;
    private String userName;
}
