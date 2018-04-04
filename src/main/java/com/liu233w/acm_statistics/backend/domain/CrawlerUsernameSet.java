package com.liu233w.acm_statistics.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * 存储了某个用户在查题网站上的用户名，某个用户可以有多个 Set，方便切换
 */
@ApiModel(description = "存储了某个用户在查题网站上的用户名，某个用户可以有多个 Set，方便切换")
@Entity
@Table(name = "crawler_username_set")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CrawlerUsernameSet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Lob
    @Column(name = "usernames", nullable = false)
    private String usernames;

    /**
     * 一个 json，存储了用户在各个网站上的用户名，如果某个用户名不存在，就不查询该网站
     */
    @NotNull
    @Size(max = 128)
    @ApiModelProperty(value = "一个 json，存储了用户在各个网站上的用户名，如果某个用户名不存在，就不查询该网站", required = true)
    @Column(name = "title", length = 128, nullable = false)
    private String title;

    /**
     * 该订阅的名称，显示给用户，方便用户检索
     */
    @NotNull
    @ApiModelProperty(value = "该订阅的名称，显示给用户，方便用户检索", required = true)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @OneToOne(mappedBy = "crawlerUsernameSetId")
    @JsonIgnore
    private CrawlerSubscription subscriptionId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsernames() {
        return usernames;
    }

    public CrawlerUsernameSet usernames(String usernames) {
        this.usernames = usernames;
        return this;
    }

    public void setUsernames(String usernames) {
        this.usernames = usernames;
    }

    public String getTitle() {
        return title;
    }

    public CrawlerUsernameSet title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getUserId() {
        return userId;
    }

    public CrawlerUsernameSet userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public CrawlerSubscription getSubscriptionId() {
        return subscriptionId;
    }

    public CrawlerUsernameSet subscriptionId(CrawlerSubscription crawlerSubscription) {
        this.subscriptionId = crawlerSubscription;
        return this;
    }

    public void setSubscriptionId(CrawlerSubscription crawlerSubscription) {
        this.subscriptionId = crawlerSubscription;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CrawlerUsernameSet crawlerUsernameSet = (CrawlerUsernameSet) o;
        if (crawlerUsernameSet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), crawlerUsernameSet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CrawlerUsernameSet{" +
            "id=" + getId() +
            ", usernames='" + getUsernames() + "'" +
            ", title='" + getTitle() + "'" +
            ", userId=" + getUserId() +
            "}";
    }
}
