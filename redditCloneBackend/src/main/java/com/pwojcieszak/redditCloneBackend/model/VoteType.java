package com.pwojcieszak.redditCloneBackend.model;

import java.util.Arrays;

public enum VoteType {
    UPVOTE(1), DOWNVOTE(-1);

    VoteType(int direction) {
    }
}
