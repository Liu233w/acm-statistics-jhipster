package com.liu233w.acm_statistics.backend.cucumber.stepdefs;

import com.liu233w.acm_statistics.backend.AcmStatisticsJhipsterApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = AcmStatisticsJhipsterApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
