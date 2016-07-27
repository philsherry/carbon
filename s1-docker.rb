class S1Docker < Formula
  homepage "https://github.com/andrewjtait/s1-docker"
  url "https://github.com/andrewjtait/s1-docker/archive/v0.0.5.tar.gz"
  sha256 "e0a70dd3dc7497c7787641105872b46b8097d041ad5e1d2e1d22e9bde3ce4c6a"

  def install
    bash_completion.install 's1-docker'
  end
end
