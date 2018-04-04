package com.liu233w.acm_statistics.backend.web.rest;

import com.liu233w.acm_statistics.backend.AcmStatisticsJhipsterApp;

import com.liu233w.acm_statistics.backend.domain.CrawlerSubscription;
import com.liu233w.acm_statistics.backend.repository.CrawlerSubscriptionRepository;
import com.liu233w.acm_statistics.backend.service.CrawlerSubscriptionService;
import com.liu233w.acm_statistics.backend.service.dto.CrawlerSubscriptionDTO;
import com.liu233w.acm_statistics.backend.service.mapper.CrawlerSubscriptionMapper;
import com.liu233w.acm_statistics.backend.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.liu233w.acm_statistics.backend.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.liu233w.acm_statistics.backend.domain.enumeration.MailPeriod;
/**
 * Test class for the CrawlerSubscriptionResource REST controller.
 *
 * @see CrawlerSubscriptionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AcmStatisticsJhipsterApp.class)
public class CrawlerSubscriptionResourceIntTest {

    private static final Instant DEFAULT_CREATE_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final MailPeriod DEFAULT_PERIOD = MailPeriod.DAILY;
    private static final MailPeriod UPDATED_PERIOD = MailPeriod.WEEKLY;

    @Autowired
    private CrawlerSubscriptionRepository crawlerSubscriptionRepository;

    @Autowired
    private CrawlerSubscriptionMapper crawlerSubscriptionMapper;

    @Autowired
    private CrawlerSubscriptionService crawlerSubscriptionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCrawlerSubscriptionMockMvc;

    private CrawlerSubscription crawlerSubscription;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CrawlerSubscriptionResource crawlerSubscriptionResource = new CrawlerSubscriptionResource(crawlerSubscriptionService);
        this.restCrawlerSubscriptionMockMvc = MockMvcBuilders.standaloneSetup(crawlerSubscriptionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CrawlerSubscription createEntity(EntityManager em) {
        CrawlerSubscription crawlerSubscription = new CrawlerSubscription()
            .createTime(DEFAULT_CREATE_TIME)
            .period(DEFAULT_PERIOD);
        return crawlerSubscription;
    }

    @Before
    public void initTest() {
        crawlerSubscription = createEntity(em);
    }

    @Test
    @Transactional
    public void createCrawlerSubscription() throws Exception {
        int databaseSizeBeforeCreate = crawlerSubscriptionRepository.findAll().size();

        // Create the CrawlerSubscription
        CrawlerSubscriptionDTO crawlerSubscriptionDTO = crawlerSubscriptionMapper.toDto(crawlerSubscription);
        restCrawlerSubscriptionMockMvc.perform(post("/api/crawler-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerSubscriptionDTO)))
            .andExpect(status().isCreated());

        // Validate the CrawlerSubscription in the database
        List<CrawlerSubscription> crawlerSubscriptionList = crawlerSubscriptionRepository.findAll();
        assertThat(crawlerSubscriptionList).hasSize(databaseSizeBeforeCreate + 1);
        CrawlerSubscription testCrawlerSubscription = crawlerSubscriptionList.get(crawlerSubscriptionList.size() - 1);
        assertThat(testCrawlerSubscription.getCreateTime()).isEqualTo(DEFAULT_CREATE_TIME);
        assertThat(testCrawlerSubscription.getPeriod()).isEqualTo(DEFAULT_PERIOD);
    }

    @Test
    @Transactional
    public void createCrawlerSubscriptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = crawlerSubscriptionRepository.findAll().size();

        // Create the CrawlerSubscription with an existing ID
        crawlerSubscription.setId(1L);
        CrawlerSubscriptionDTO crawlerSubscriptionDTO = crawlerSubscriptionMapper.toDto(crawlerSubscription);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCrawlerSubscriptionMockMvc.perform(post("/api/crawler-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CrawlerSubscription in the database
        List<CrawlerSubscription> crawlerSubscriptionList = crawlerSubscriptionRepository.findAll();
        assertThat(crawlerSubscriptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCreateTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = crawlerSubscriptionRepository.findAll().size();
        // set the field null
        crawlerSubscription.setCreateTime(null);

        // Create the CrawlerSubscription, which fails.
        CrawlerSubscriptionDTO crawlerSubscriptionDTO = crawlerSubscriptionMapper.toDto(crawlerSubscription);

        restCrawlerSubscriptionMockMvc.perform(post("/api/crawler-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        List<CrawlerSubscription> crawlerSubscriptionList = crawlerSubscriptionRepository.findAll();
        assertThat(crawlerSubscriptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPeriodIsRequired() throws Exception {
        int databaseSizeBeforeTest = crawlerSubscriptionRepository.findAll().size();
        // set the field null
        crawlerSubscription.setPeriod(null);

        // Create the CrawlerSubscription, which fails.
        CrawlerSubscriptionDTO crawlerSubscriptionDTO = crawlerSubscriptionMapper.toDto(crawlerSubscription);

        restCrawlerSubscriptionMockMvc.perform(post("/api/crawler-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        List<CrawlerSubscription> crawlerSubscriptionList = crawlerSubscriptionRepository.findAll();
        assertThat(crawlerSubscriptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCrawlerSubscriptions() throws Exception {
        // Initialize the database
        crawlerSubscriptionRepository.saveAndFlush(crawlerSubscription);

        // Get all the crawlerSubscriptionList
        restCrawlerSubscriptionMockMvc.perform(get("/api/crawler-subscriptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(crawlerSubscription.getId().intValue())))
            .andExpect(jsonPath("$.[*].createTime").value(hasItem(DEFAULT_CREATE_TIME.toString())))
            .andExpect(jsonPath("$.[*].period").value(hasItem(DEFAULT_PERIOD.toString())));
    }

    @Test
    @Transactional
    public void getCrawlerSubscription() throws Exception {
        // Initialize the database
        crawlerSubscriptionRepository.saveAndFlush(crawlerSubscription);

        // Get the crawlerSubscription
        restCrawlerSubscriptionMockMvc.perform(get("/api/crawler-subscriptions/{id}", crawlerSubscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(crawlerSubscription.getId().intValue()))
            .andExpect(jsonPath("$.createTime").value(DEFAULT_CREATE_TIME.toString()))
            .andExpect(jsonPath("$.period").value(DEFAULT_PERIOD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCrawlerSubscription() throws Exception {
        // Get the crawlerSubscription
        restCrawlerSubscriptionMockMvc.perform(get("/api/crawler-subscriptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCrawlerSubscription() throws Exception {
        // Initialize the database
        crawlerSubscriptionRepository.saveAndFlush(crawlerSubscription);
        int databaseSizeBeforeUpdate = crawlerSubscriptionRepository.findAll().size();

        // Update the crawlerSubscription
        CrawlerSubscription updatedCrawlerSubscription = crawlerSubscriptionRepository.findOne(crawlerSubscription.getId());
        // Disconnect from session so that the updates on updatedCrawlerSubscription are not directly saved in db
        em.detach(updatedCrawlerSubscription);
        updatedCrawlerSubscription
            .createTime(UPDATED_CREATE_TIME)
            .period(UPDATED_PERIOD);
        CrawlerSubscriptionDTO crawlerSubscriptionDTO = crawlerSubscriptionMapper.toDto(updatedCrawlerSubscription);

        restCrawlerSubscriptionMockMvc.perform(put("/api/crawler-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerSubscriptionDTO)))
            .andExpect(status().isOk());

        // Validate the CrawlerSubscription in the database
        List<CrawlerSubscription> crawlerSubscriptionList = crawlerSubscriptionRepository.findAll();
        assertThat(crawlerSubscriptionList).hasSize(databaseSizeBeforeUpdate);
        CrawlerSubscription testCrawlerSubscription = crawlerSubscriptionList.get(crawlerSubscriptionList.size() - 1);
        assertThat(testCrawlerSubscription.getCreateTime()).isEqualTo(UPDATED_CREATE_TIME);
        assertThat(testCrawlerSubscription.getPeriod()).isEqualTo(UPDATED_PERIOD);
    }

    @Test
    @Transactional
    public void updateNonExistingCrawlerSubscription() throws Exception {
        int databaseSizeBeforeUpdate = crawlerSubscriptionRepository.findAll().size();

        // Create the CrawlerSubscription
        CrawlerSubscriptionDTO crawlerSubscriptionDTO = crawlerSubscriptionMapper.toDto(crawlerSubscription);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCrawlerSubscriptionMockMvc.perform(put("/api/crawler-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerSubscriptionDTO)))
            .andExpect(status().isCreated());

        // Validate the CrawlerSubscription in the database
        List<CrawlerSubscription> crawlerSubscriptionList = crawlerSubscriptionRepository.findAll();
        assertThat(crawlerSubscriptionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCrawlerSubscription() throws Exception {
        // Initialize the database
        crawlerSubscriptionRepository.saveAndFlush(crawlerSubscription);
        int databaseSizeBeforeDelete = crawlerSubscriptionRepository.findAll().size();

        // Get the crawlerSubscription
        restCrawlerSubscriptionMockMvc.perform(delete("/api/crawler-subscriptions/{id}", crawlerSubscription.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CrawlerSubscription> crawlerSubscriptionList = crawlerSubscriptionRepository.findAll();
        assertThat(crawlerSubscriptionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CrawlerSubscription.class);
        CrawlerSubscription crawlerSubscription1 = new CrawlerSubscription();
        crawlerSubscription1.setId(1L);
        CrawlerSubscription crawlerSubscription2 = new CrawlerSubscription();
        crawlerSubscription2.setId(crawlerSubscription1.getId());
        assertThat(crawlerSubscription1).isEqualTo(crawlerSubscription2);
        crawlerSubscription2.setId(2L);
        assertThat(crawlerSubscription1).isNotEqualTo(crawlerSubscription2);
        crawlerSubscription1.setId(null);
        assertThat(crawlerSubscription1).isNotEqualTo(crawlerSubscription2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CrawlerSubscriptionDTO.class);
        CrawlerSubscriptionDTO crawlerSubscriptionDTO1 = new CrawlerSubscriptionDTO();
        crawlerSubscriptionDTO1.setId(1L);
        CrawlerSubscriptionDTO crawlerSubscriptionDTO2 = new CrawlerSubscriptionDTO();
        assertThat(crawlerSubscriptionDTO1).isNotEqualTo(crawlerSubscriptionDTO2);
        crawlerSubscriptionDTO2.setId(crawlerSubscriptionDTO1.getId());
        assertThat(crawlerSubscriptionDTO1).isEqualTo(crawlerSubscriptionDTO2);
        crawlerSubscriptionDTO2.setId(2L);
        assertThat(crawlerSubscriptionDTO1).isNotEqualTo(crawlerSubscriptionDTO2);
        crawlerSubscriptionDTO1.setId(null);
        assertThat(crawlerSubscriptionDTO1).isNotEqualTo(crawlerSubscriptionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(crawlerSubscriptionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(crawlerSubscriptionMapper.fromId(null)).isNull();
    }
}
