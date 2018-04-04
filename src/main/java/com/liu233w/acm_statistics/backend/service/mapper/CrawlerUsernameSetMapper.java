package com.liu233w.acm_statistics.backend.service.mapper;

import com.liu233w.acm_statistics.backend.domain.*;
import com.liu233w.acm_statistics.backend.service.dto.CrawlerUsernameSetDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CrawlerUsernameSet and its DTO CrawlerUsernameSetDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CrawlerUsernameSetMapper extends EntityMapper<CrawlerUsernameSetDTO, CrawlerUsernameSet> {


    @Mapping(target = "subscriptionId", ignore = true)
    CrawlerUsernameSet toEntity(CrawlerUsernameSetDTO crawlerUsernameSetDTO);

    default CrawlerUsernameSet fromId(Long id) {
        if (id == null) {
            return null;
        }
        CrawlerUsernameSet crawlerUsernameSet = new CrawlerUsernameSet();
        crawlerUsernameSet.setId(id);
        return crawlerUsernameSet;
    }
}
