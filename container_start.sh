indexFile=/usr/share/nginx/html/index.html

sed -i "s/BACKEND_URL/${BACKEND_URL}/g" $indexFile
sed -i "s/FIXED_URL/${SSO_URL}/g" $indexFile
sed -i "s/WX_CORP_ID/${WX_CORP_ID}/g" $indexFile
sed -i "s/ENV/${ENV}/g" $indexFile

nginx -g "daemon off;"