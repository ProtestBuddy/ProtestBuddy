meteor build ../ --directory --architecture os.linux.x86_64 --server-only
cp app.yaml ../bundle/
cp Dockerfile ../bundle/
cd ../bundle
gcloud app deploy --verbosity=info -q