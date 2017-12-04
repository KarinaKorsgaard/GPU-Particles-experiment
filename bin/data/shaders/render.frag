#version 120
#extension GL_ARB_texture_rectangle : enable

// This fill the billboard made on the Geometry Shader with a texture

//uniform sampler2DRect sparkTex;
uniform vec2 screen;
uniform sampler2DRect velData;   // recive the previus velocity texture
uniform sampler2DRect posTex;   // recive the previus velocity texture
uniform float u_size;

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(2.);
    //return clamp(dot(l,l)*10.0,0.,1.);
    return 1.-smoothstep(_radius-(_radius*0.9),
                         _radius+(_radius*0.9),
                         dot(dist,dist)*4.0);

}

void main() {
    vec2 st = gl_TexCoord[0].st;
   
    vec2 uv = gl_FragCoord.xy/screen.xy;


    float c = 0.0;
    c += circle(st *0.09, u_size*1.);
    
    
    gl_FragColor = vec4(c,c*uv,u_size*0.1);
}
