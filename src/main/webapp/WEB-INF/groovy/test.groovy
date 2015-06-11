import io.vteial.wyd.model.AutoNumber

println '''
<html><head><title>Test</title><head><body><pre>
'''
println '-----------------------------------------------------------------'
try {
	AutoNumber an = new AutoNumber()
	println(an)
}
catch(Throwable t) {
t.printStackTrace(out)
}
println '-----------------------------------------------------------------'

println '''
</pre></body></html>
'''

