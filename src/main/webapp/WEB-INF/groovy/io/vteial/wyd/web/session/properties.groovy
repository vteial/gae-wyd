package io.vteial.wyd.web.session;

import io.vteial.wyd.dto.ResponseDto
import io.vteial.wyd.dto.SessionDto
import io.vteial.wyd.service.SessionService

ResponseDto responseDto = request.responseDto

def props = sessionService.properties(session), model = [:]

if (responseDto) {
    responseDto.data = props
} else {
    responseDto = new ResponseDto(data: props)
}

SessionDto sessionDto = session[SessionService.SESSION_USER_KEY]

jsonCategory.respondWithJson(response, responseDto)

