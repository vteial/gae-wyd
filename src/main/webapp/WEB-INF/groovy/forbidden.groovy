import io.vteial.wyd.dto.ResponseDto
import io.vteial.wyd.dto.SessionDto
import io.vteial.wyd.service.SessionService

ResponseDto responseDto = new ResponseDto()

responseDto.type = ResponseDto.FORBIDDEN
responseDto.message = 'Forbidden! You have login to access this resource...'

jsonCategory.respondWithJson(response, responseDto)
