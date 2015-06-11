package io.vteial.wyd

import groovyx.gaelyk.plugins.PluginBaseScript
import io.vteial.wyd.service.impl.DefaultAutoNumberService
import io.vteial.wyd.service.impl.DefaultSessionService

class GeneralPlugin extends PluginBaseScript {

    @Override
    public Object run() {
        log.info "Registering GeneralPlugin started..."

        DefaultAutoNumberService anS = new DefaultAutoNumberService()

        DefaultSessionService sesS = new DefaultSessionService()
        sesS.autoNumberService = anS
        sesS.appUserService = users

        binding {
            console = System.out
            jsonCategory = JacksonCategory
            jsonObjectMapper = JacksonCategory.jsonObjectMapper
            sessionService = sesS
            autoNumberService = anS
        }

        routes {
        }

        before {
            //log.info "Visiting ${request.requestURI}"
            //binding.uri = request.requestURI
        }

        after {
            //log.info "Exiting ${request.requestURI}"
            //log.info "groovlet returned $result from its execution"
        }

        log.info "Registering GeneralPlugin finished..."
    }
}
