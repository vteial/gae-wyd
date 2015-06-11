package io.vteial.wyd.web.session

import io.vteial.wyd.dto.ResponseDto
import io.vteial.wyd.dto.SessionDto
import io.vteial.wyd.dto.UserDto
import io.vteial.wyd.service.exceptions.InvalidCredentialException
import io.vteial.wyd.service.exceptions.UnAuthorizedException

ResponseDto responseDto = new ResponseDto(type : 0, message : 'Successfully logged in...')
request.responseDto = responseDto

UserDto userDto = jsonCategory.parseJson(request, UserDto.class)
try {
	SessionDto sessionUserDto = sessionService.login(session, userDto)
	responseDto.data = sessionService.properties(session)
}
catch(InvalidCredentialException e) {
	responseDto.type = ResponseDto.ERROR
	responseDto.message = 'Invalid User Id or Password...'
}
catch(UnAuthorizedException e) {
	responseDto.type = ResponseDto.ERROR
	responseDto.message = 'UnAuthorized access...'
}
catch(Throwable t) {
	responseDto.type = ResponseDto.UNKNOWN
	responseDto.message = t.message

	StringWriter sw = new StringWriter()
	PrintWriter pw = new PrintWriter(sw)
	t.printStackTrace(pw)
	responseDto.message = 'Login failed...';
	responseDto.data = sw.toString()

	log.warning(sw.toString())
}

jsonCategory.respondWithJson(response, responseDto)