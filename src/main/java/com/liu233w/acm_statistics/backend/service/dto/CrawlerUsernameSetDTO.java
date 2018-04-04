package com.liu233w.acm_statistics.backend.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the CrawlerUsernameSet entity.
 */
public class CrawlerUsernameSetDTO implements Serializable {

    private Long id;

    @NotNull
    @Lob
    private String usernames;

    @NotNull
    @Size(max = 128)
    private String title;

    @NotNull
    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsernames() {
        return usernames;
    }

    public void setUsernames(String usernames) {
        this.usernames = usernames;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CrawlerUsernameSetDTO crawlerUsernameSetDTO = (CrawlerUsernameSetDTO) o;
        if(crawlerUsernameSetDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), crawlerUsernameSetDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CrawlerUsernameSetDTO{" +
            "id=" + getId() +
            ", usernames='" + getUsernames() + "'" +
            ", title='" + getTitle() + "'" +
            ", userId=" + getUserId() +
            "}";
    }
}
