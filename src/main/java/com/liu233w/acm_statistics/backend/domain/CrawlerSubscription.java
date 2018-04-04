package com.liu233w.acm_statistics.backend.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.liu233w.acm_statistics.backend.domain.enumeration.MailPeriod;

/**
 * 订阅。用户可以订阅某些 CrawlerUsernameSet，可以定期给用户发送报告
 */
@ApiModel(description = "订阅。用户可以订阅某些 CrawlerUsernameSet，可以定期给用户发送报告")
@Entity
@Table(name = "crawler_subscription")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CrawlerSubscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "create_time", nullable = false)
    private Instant createTime;

    /**
     * 多久发一次
     */
    @NotNull
    @ApiModelProperty(value = "多久发一次", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "period", nullable = false)
    private MailPeriod period;

    @OneToOne
    @JoinColumn(unique = true)
    private CrawlerUsernameSet crawlerUsernameSetId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreateTime() {
        return createTime;
    }

    public CrawlerSubscription createTime(Instant createTime) {
        this.createTime = createTime;
        return this;
    }

    public void setCreateTime(Instant createTime) {
        this.createTime = createTime;
    }

    public MailPeriod getPeriod() {
        return period;
    }

    public CrawlerSubscription period(MailPeriod period) {
        this.period = period;
        return this;
    }

    public void setPeriod(MailPeriod period) {
        this.period = period;
    }

    public CrawlerUsernameSet getCrawlerUsernameSetId() {
        return crawlerUsernameSetId;
    }

    public CrawlerSubscription crawlerUsernameSetId(CrawlerUsernameSet crawlerUsernameSet) {
        this.crawlerUsernameSetId = crawlerUsernameSet;
        return this;
    }

    public void setCrawlerUsernameSetId(CrawlerUsernameSet crawlerUsernameSet) {
        this.crawlerUsernameSetId = crawlerUsernameSet;
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
        CrawlerSubscription crawlerSubscription = (CrawlerSubscription) o;
        if (crawlerSubscription.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), crawlerSubscription.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CrawlerSubscription{" +
            "id=" + getId() +
            ", createTime='" + getCreateTime() + "'" +
            ", period='" + getPeriod() + "'" +
            "}";
    }
}
