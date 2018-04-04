package com.liu233w.acm_statistics.backend.service.mapper;

import com.liu233w.acm_statistics.backend.domain.*;
import com.liu233w.acm_statistics.backend.service.dto.HistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity History and its DTO HistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface HistoryMapper extends EntityMapper<HistoryDTO, History> {



    default History fromId(Long id) {
        if (id == null) {
            return null;
        }
        History history = new History();
        history.setId(id);
        return history;
    }
}
